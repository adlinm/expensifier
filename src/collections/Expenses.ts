// src/collections/Expenses.ts
import { CollectionConfig } from 'payload/types';

const Expenses: CollectionConfig = {
  slug: 'expenses',
  admin: {
    useAsTitle: 'amount',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'amount',
      type: 'number',
      label: 'Expense Amount',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Expense Date',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Category',
      required: false,
    },
    {
      name: 'subCategory',
      type: 'relationship',
      relationTo: 'subcategories',
      label: 'Subcategory',
      required: false,
    },
    // Display-only fields for the admin panel
    {
      name: 'categoryTitle',
      type: 'text',
      label: 'Category Title',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subCategoryTitle',
      type: 'text',
      label: 'Subcategory Title',
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: false,

  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        try {
          // Fetch category title
          if (doc.category && typeof doc.category === 'string') {
            const category = await req.payload.findByID({
              collection: 'categories',
              id: doc.category,
            });
            doc.categoryTitle = category ? category.title : 'No category';
          }

          // Fetch subcategory title
          if (doc.subCategory && typeof doc.subCategory === 'string') {
            const subCategory = await req.payload.findByID({
              collection: 'subcategories',
              id: doc.subCategory,
            });
            doc.subCategoryTitle = subCategory ? subCategory.title : 'No subcategory';
          }
        } catch (error) {
          console.error("Error in afterRead hook for Expenses:", error);
        }

        return doc;
      },
    ],
  },
};

export default Expenses;
