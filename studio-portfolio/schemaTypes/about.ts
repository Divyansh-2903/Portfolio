import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext (Roles)',
      type: 'text',
    }),
    defineField({
      name: 'philosophyHeadline',
      title: 'Philosophy Headline',
      type: 'string',
    }),
    defineField({
      name: 'philosophyBody',
      title: 'Philosophy Body',
      type: 'text',
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for projects?',
      type: 'boolean',
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'locationLabel',
      title: 'Location Label',
      type: 'string',
    }),
    defineField({
      name: 'designCards',
      title: 'Design DNA Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'num', type: 'string', title: 'Number/ID' },
            { name: 'tag', type: 'string', title: 'Tag' },
            { name: 'accent', type: 'string', title: 'Accent Color' },
            { name: 'gradient', type: 'string', title: 'Gradient CSS' },
            { name: 'iconName', type: 'string', title: 'Icon Name (Lucide)' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'body', type: 'text', title: 'Body' },
          ],
        },
      ],
    }),
    defineField({
      name: 'timelineItems',
      title: 'Career History Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'period', type: 'string', title: 'Period' },
            { name: 'role', type: 'string', title: 'Role' },
            { name: 'company', type: 'string', title: 'Company' },
            { name: 'desc', type: 'text', title: 'Description' },
          ],
        },
      ],
    }),
    defineField({
      name: 'toolkitItems',
      title: 'Technical Arsenal (Toolkit)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'category', type: 'string', title: 'Category' },
            { name: 'iconName', type: 'string', title: 'Icon Name (Lucide)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'identityReel',
      title: 'Identity Reel (Off the clock)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'gradient', type: 'string', title: 'Gradient CSS' },
            { name: 'accentColor', type: 'string', title: 'Accent Color' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
});
