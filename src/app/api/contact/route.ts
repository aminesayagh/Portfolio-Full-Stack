import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

import { NOTION_API_KEY, NOTION_DATABASE_ID } from "@/utils/env";

import type { NextRequest} from "next/server";

const notion = new Client({ auth: NOTION_API_KEY });
const databaseId = NOTION_DATABASE_ID || "";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, objective, message, locale } =
      await request.json();

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content: `${firstName} ${lastName}` } }]
        },
        firstName: {
          rich_text: [{ text: { content: firstName } }]
        },
        lastName: {
          rich_text: [{ text: { content: lastName } }]
        },
        email: {
          email: email
        },
        objective: {
          select: {
            name: objective
          }
        },
        message: {
          rich_text: [{ text: { content: message } }]
        },
        locale: {
          select: {
            name: locale
          }
        }
      }
    });

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Error back end" },
      { status: 500 }
    );
  }
}
