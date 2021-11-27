# GROQ Cheatsheet
This only applies to document wide translations.

## Query by language
```
*[_type == "type" && __i18n_lang == $lang]
```
**Note** This will not work on never before published, base language documents because they will not have the `__i18n_lang` field yet.

## Get specific document by language and fallback to base
## Subpath
```
coalesce(
  *[_id in path("i18n." + $id + "." + $lang)][0],
  *[_id == $id][0]
)
```

## Delimiter
```
coalesce(
  *[_id match $id && __i18n_lang == $lang][0],
  *[_id == $id][0]
)
```

## Get all base language documents for a type without language field
### Subpath
```
*[_type == "type" && !(_id in path("drafts.i18n.*") && _id in path("i18n.**"))]
```
### Delimiter
```
*[_type == "type" && !(_id in match ["*__i18n__*"])]
```

## Get list of all available languages for a given document type
```
*[_type == "type" && !(_id in path("drafts.i18n.*") && _id in path("i18n.**"))] {
  "languages": [__i18n_lang, ...__i18n_refs[].lang]
}
```