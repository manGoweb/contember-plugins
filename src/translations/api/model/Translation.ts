import { SchemaDefinition as def } from '@contember/schema-definition'

@def.Unique('identifier')
export class TranslationDomain {
	identifier = def.stringColumn().notNull()

	name = def.stringColumn().notNull()

	catalogues = def.oneHasMany(TranslationCatalogue, 'domain') as def.OneHasManyDefinition
	keys = def.oneHasMany(TranslationKey, 'domain') as def.OneHasManyDefinition
}

@def.Unique('domain', 'identifier')
export class TranslationCatalogue {
	domain = def.manyHasOne(TranslationDomain, 'catalogues').notNull().cascadeOnDelete()
	identifier = def.stringColumn().notNull()

	fallback = def.manyHasOne(TranslationCatalogue).setNullOnDelete() as def.ManyHasOneDefinition
	name = def.stringColumn().notNull()

	values = def.oneHasMany(TranslationValue, 'catalogue') as def.OneHasManyDefinition
}

@def.Unique('domain', 'identifier')
export class TranslationKey {
	domain = def.manyHasOne(TranslationDomain, 'keys').notNull().cascadeOnDelete()
	identifier = def.stringColumn().notNull()

	contentType = def.enumColumn(TranslationContentType).notNull()
	note = def.stringColumn()

	values = def.oneHasMany(TranslationValue, 'key') as def.OneHasManyDefinition
}

@def.Unique('catalogue', 'key')
export class TranslationValue {
	catalogue = def.manyHasOne(TranslationCatalogue, 'values').cascadeOnDelete().notNull()
	key = def.manyHasOne(TranslationKey, 'values').notNull().cascadeOnDelete()

	value = def.stringColumn().notNull()
}

export const TranslationContentType = def.createEnum('textPlain', 'textHtml')
