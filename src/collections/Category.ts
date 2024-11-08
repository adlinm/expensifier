import { CollectionConfig } from 'payload/types';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title', // Set the field to use as the title in the admin panel
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Category Title',
    },
  ],
  timestamps: false,
};

export default Categories;
