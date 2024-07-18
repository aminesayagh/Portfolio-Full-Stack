// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next'

import { NOTION_API_KEY, NOTION_DATABASE_ID } from 'utils/env';
const notion = new Client({ auth: NOTION_API_KEY });
type Data = {
  status: 'success',
} | {
  status: 'error',
  message: string
}

const databaseId = NOTION_DATABASE_ID || '';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { firstName, lastName, email, objective, message, locale } = req.body;
  // Notion API call
  async function addItem() {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: `${firstName} ${lastName}`,
              },
            },
          ],
        },
        firstName: {
          rich_text: [
            {
              text: {
                content: firstName,
              },

            },
          ],
        },
        lastName: {
          rich_text: [
            {
              text: {
                content: lastName,
              },
            }
          ],
        },
        email: {
          email: email,
        },
        objective: {
          select: {
            name: objective,
          },
        },
        message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        locale: {
          select: {
            name: locale
          }
        }
      },
    }).catch(err => {
      throw new Error(err.body);
    })
    return response;
  }
  try {
    await addItem();
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error back end' });
  }
}
