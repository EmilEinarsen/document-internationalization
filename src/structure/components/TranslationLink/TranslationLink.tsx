import * as React from 'react'
import {SanityDocument} from '@sanity/client'
import {Stack, Button, Badge, Card, Flex, Box, Text, Code, Heading} from '@sanity/ui'
import {usePaneRouter} from '@sanity/desk-tool'
import flagOverrides from 'part:sanity-plugin-intl-input/ui/flags?'
import {Flag} from '../Flag'
import {getSanityClient, getConfig, buildDocId} from '../../../utils'
import {ILanguageObject, Ti18nSchema} from '../../../types'

interface IProps {
  docId: string
  index: number
  schema: Ti18nSchema
  lang: ILanguageObject
  isCurrentLanguage: boolean
  baseDocument?: any
}

export const TranslationLink: React.FunctionComponent<IProps> = ({
  docId,
  index,
  schema,
  lang,
  isCurrentLanguage,
  baseDocument,
}) => {
  const config = getConfig(schema)
  const [existing, setExisting] = React.useState<null | SanityDocument>(null)
  const languageAsVariableName = lang.name.replace(/[^a-zA-Z]/g, '_')
  const FlagComponent =
    flagOverrides && languageAsVariableName in flagOverrides
      ? flagOverrides[languageAsVariableName]
      : Flag

  // Split a country and language if both supplied
  // Expects language first, then country: `en-us` or `en`
  const [codeCountry, codeLanguage] = new RegExp(/[_-]/).test(lang.name)
    ? lang.name.split(/[_-]/)
    : [``, lang.name]

  const translatedDocId = (config.base ? lang.name === config.base : index === 0)
    ? docId
    : buildDocId(docId, lang.name)

  const {navigateIntent} = usePaneRouter()

  React.useEffect(() => {
    getSanityClient()
      .fetch('*[_id == $id || _id == $draftId]', {
        id: translatedDocId,
        draftId: `drafts.${translatedDocId}`,
      })
      .then((response) => {
        const ex = response.find((r) => r._id === translatedDocId)
        if (ex) setExisting(ex)
        else setExisting(response.find((r) => r._id === `drafts.${translatedDocId}`))
      })
      .catch((err) => {
        console.error(err)
      })
  }, [lang.name])

  const handleClick = (params = {}) => {
    if (existing === undefined) {
      const fieldName = config.fieldNames.lang
      getSanityClient().createIfNotExists({
        ...(baseDocument ? baseDocument : {}),
        _id: `drafts.${translatedDocId}`,
        _type: schema.name,
        [fieldName]: lang.name,
      })
    }

    // TODO: Leverage this function to open doc without resetting all panes
    navigateIntent('edit', params)
  }

  return (
    <>
      <Card radius={2} tone={isCurrentLanguage ? `primary` : `default`}>
        <Button
          mode={isCurrentLanguage ? `default` : `bleed`}
          padding={2}
          onClick={() => handleClick({id: translatedDocId, type: schema.name})}
          style={{width: `100%`}}
        >
          <Flex align="center" gap={4}>
            <Box>
              {codeCountry && codeLanguage && (
                <Flex
                  direction="column"
                  paddingBottom={3}
                  paddingRight={3}
                  style={{position: 'relative'}}
                >
                  <Heading size={4}>
                    <FlagComponent code={codeCountry} />
                  </Heading>
                  <Heading size={4} style={{position: 'absolute', bottom: 0, right: 0}}>
                    <FlagComponent code={codeLanguage} />
                  </Heading>
                </Flex>
              )}
              {!codeCountry && codeLanguage && (
                <Box paddingX={1}>
                  <Heading size={5}>
                    <FlagComponent code={codeLanguage} />
                  </Heading>
                </Box>
              )}
            </Box>
            <Box flex={1}>
              <Stack space={2}>
                <Text>{lang.title}</Text>
                <Code size={1}>{lang.name}</Code>
              </Stack>
            </Box>
            {lang.isBase && (
              <Badge tone="primary" mode="outline">
                Base
              </Badge>
            )}
            {!existing && <Badge tone="caution">{config.messages?.missing}</Badge>}
            {existing && existing._id.startsWith('drafts.') && (
              <Badge>{config.messages?.draft}</Badge>
            )}
          </Flex>
        </Button>
      </Card>
      {lang.isBase && <Card padding={0} borderTop style={{height: `1px !important`}} />}
    </>
  )
}
