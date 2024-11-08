import { buildConfig } from 'payload/config';
import cors from 'cors'; // Import cors
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import Users from './collections/Users';
import Category from './collections/Category';
import Expenses from './collections/Expenses';
import Subcategory from './collections/Subcategory';
import path from 'path';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import { mongooseAdapter } from '@payloadcms/db-mongodb';

export default buildConfig({
  collections: [
    Users,
    Category,
    Expenses,
    Subcategory,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI, // Correct place to set your MongoDB connection URI
  }),
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  
  plugins: 
  [payloadCloud()],
  
  // Adding middleware for CORS
  express: {
    middleware: [
      cors({
        origin: 'http://localhost:5173',  // URL of your Vite frontend
        credentials: true,
      }),
    ],
  },
});
