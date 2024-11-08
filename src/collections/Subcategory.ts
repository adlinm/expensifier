import { CollectionConfig } from 'payload/types';

const Subcategories: CollectionConfig = {
  slug: 'subcategories',
  admin: {
    useAsTitle: 'title', // Display 'title' in the admin panel
  },
  access: {
    read: () => true,   // Allow all users to read subcategories
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Subcategory Title',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Category',
    },
  ],
  timestamps: false,
};

export default Subcategories;
