import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Table from "~/components/Text/Table/Table";
import { getAllTexts } from "~/service/text.server";

export async function loader() {
	try {
		const texts = await getAllTexts()

		return json({ texts })
	} catch (error) {
		throw new Response("Bad request")
	}
}

export default function Content() {
	const data = useLoaderData<typeof loader>()
	return (
		<div style={{ gridArea: 'main' }} className="p-4">
			<Table texts={data.texts} />
		</div>
	);
}