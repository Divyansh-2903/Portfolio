import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'id',
      title: 'Project ID (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description (1-line)',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fullstack', value: 'fullstack' },
          { title: 'Video', value: 'video' },
        ],
      },
    }),
    defineField({
      name: 'tech',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
    }),
    defineField({
      name: 'gradient',
      title: 'Gradient (CSS)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    }),
    defineField({
      name: 'problem',
      title: 'Problem (Case Study)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'solution',
      title: 'Solution (Case Study)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'results',
      title: 'Results (Case Study)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
