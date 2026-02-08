import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new NextResponse('Invalid Signature', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    revalidateTag(body._type, 'default');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error(err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
