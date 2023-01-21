import {ComponentBuilder} from 'sanity/desk'
import type {ComponentType} from 'react'
import {DocumentActionComponent} from 'sanity'
import {DocumentActionsContext} from 'sanity'
import {DocumentBuilder} from 'sanity/desk'
import type {FC} from 'react'
import {ListBuilder} from 'sanity/desk'
import {ListItem} from 'sanity/desk'
import {ListItemBuilder} from 'sanity/desk'
import {Plugin as Plugin_2} from 'sanity'
import type {PluginOptions} from 'sanity'
import type {SanityClient} from '@sanity/client'
import {SanityDocument} from 'sanity'
import {Schema} from 'sanity'
import {SchemaType} from 'sanity'
import type {SlugIsUniqueValidator} from 'sanity'
import {StructureBuilder} from 'sanity/desk'

export declare function createDeleteAction(pluginConfig: Ti18nConfig): DocumentActionComponent

export declare function createDuplicateAction(pluginConfig: Ti18nConfig): DocumentActionComponent

export declare function createIsSlugUnique(client: SanityClient): SlugIsUniqueValidator

export declare function createPublishAction(pluginConfig: Ti18nConfig): DocumentActionComponent

export declare const documentI18n: Plugin_2<Ti18nConfig>

export declare const getDefaultDocumentNode: (S: StructureBuilder) => DocumentBuilder

export declare function getDocumentList(props: StructureConfig): ListBuilder

export declare const getDocumentTypes: (props: StructureConfig) => {
  withoutI18n: ListItemBuilder[]
  withI18n: ListItemBuilder[]
}

export declare const getFilteredDocumentTypeListItems: (props: StructureConfig) => ListItem[]

export declare const getMaintenanceListItem: (props: StructureConfig) => ListItemBuilder

export declare const getMaintenanceTabComponent: (props: StructureConfig) => ComponentBuilder

export declare const I18nDelimiter = '__i18n_'

export declare const I18nPrefix = 'i18n'

export declare enum IdStructure {
  SUBPATH = 'subpath',
  DELIMITER = 'delimiter',
}

declare interface ILanguageObject {
  id: string
  title: string
}

declare interface ILanguageQuery {
  query: string
  value:
    | string
    | {
        id: string
        title: string
      }
    | {
        name: string
        title: string
      }
}

export declare const LanguageCultures: {
  value: string
  title: string
}[]

export declare enum ReferenceBehavior {
  STRONG = 'strong',
  WEAK = 'weak',
  DISABLED = 'disabled',
}

export declare const resolveActions: (
  prev: DocumentActionComponent[],
  {schema, schemaType, documentId}: DocumentActionsContext,
  pluginConfig: Ti18nConfig
) => DocumentActionComponent[]

export declare interface StructureConfig {
  S: StructureBuilder
  config: Ti18nConfig
  schema: Schema & {
    i18n?: Ti18nConfig
  }
}

export declare const SupportedEmojiFlagCodes: string[]

declare type TFieldNamesConfig = {
  lang?: string
  references?: string
  baseReference?: string
}

declare type Ti18nConfig = {
  base?: string
  languages?: TLanguagesOption
  idStructure?: IdStructure
  referenceBehavior?: ReferenceBehavior
  fieldNames?: TFieldNamesConfig
  withTranslationsMaintenance?: boolean
  languagesLoader?: (
    languages: ILanguageObject[],
    doc: SanityDocument | undefined
  ) => Promise<ILanguageObject[]> | ILanguageObject[]
  shouldReload?: (doc: SanityDocument | undefined | null) => boolean
  fallbackLanguageSelect?: FC<{
    schemaType?: SchemaType & {
      i18n?: boolean | Ti18nConfig
    }
  }>
  customFlagComponents?: Record<
    string,
    ComponentType<{
      className?: string
      code?: string
      langCulture?: string
    }>
  >
}

declare type TLanguagesOption = (string | ILanguageObject)[] | ILanguageQuery

export declare const UiMessages: {
  publishing: string
  publish: string
  updatingIntlFields: string
  intlFieldsUpdated: string
  baseDocumentCopied: string
  translationCreatedToast: {
    title: (name: string) => string
    description: (name: string) => string
  }
  loading: string
  draft: string
  missingTranslations: string
  base: string
  missing: string
  deleteAll: {
    buttonTitle: string
    deleting: string
  }
  duplicateAll: {
    buttonTitle: string
    duplicating: string
  }
  translationsMaintenance: {
    title: string
    selectSchemaPlaceholder: string
    idStructureMismatch: string
    missingLanguageField: string
    missingDocumentRefs: string
    missingBaseDocumentRefs: string
    orphanDocuments: string
    referenceBehaviorMismatch: string
    baseLanguageMismatch: string
    fix: string
    pendingTransactionDialog: {
      header: string
      caution: string
      cancel: string
      confirm: string
    }
  }
  errors: {
    baseDocumentNotPublished: string
  }
  languageSelect: {
    placeholder: string
    listLabels: {
      existing: string
      missing: string
    }
  }
}

export declare function withDocumentI18nPlugin(
  plugins: PluginOptions[] | ((config: Ti18nConfig) => PluginOptions[]),
  config: Ti18nConfig & {
    includeDeskTool?: boolean
  }
): PluginOptions[]

export {}

declare module '@sanity/types' {
    interface DocumentDefinition {
        i18n?: boolean | Ti18nConfig;
    }
}