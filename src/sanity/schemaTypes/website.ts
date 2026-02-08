import { defineField, defineType } from 'sanity';

export const websiteType = defineType({
  name: 'website',
  title: 'Website',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'purchasePrice',
      title: 'Purchase Price',
      type: 'number',
    }),
    defineField({
      name: 'monthlyPrice',
      title: 'Monthly Price',
      type: 'number',
    }),
    defineField({
      name: 'stripeLink',
      title: 'Stripe Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
      media: 'previewImage',
    },
  },
});
