import { Image } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone-esm";

function CustomDropzone({ action, image }: { image: SerializeFrom<Image | null>, action: string }) {
	const submit = useSubmit()
	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ noClick: true });


	useEffect(() => {
		if (acceptedFiles.length > 0) {
			const newFormData = new FormData()
			acceptedFiles.map((file) => newFormData.set(`file`, file))
			newFormData.set('type', "postImage")
			submit(newFormData, { method: "post", navigate: false, action, encType: "multipart/form-data" })
		}

	}, [acceptedFiles, action, submit])
	return (
		<div  {...getRootProps({ className: "dropzone w-full h-full flex" })}>
			<input className="input-zone" {...getInputProps()} />
			{image ? (
				<img
					className="w-full  object-cover rounded-sm "
					src={image.path.includes("https") ? image.path : `/uploads/${image.path}`}
					alt={image.path}
				/>
			) : <div className="text-center">
				<p className="flex h-full items-center text-lg text-gray-400">
					Drag’n’drop some files here, or click to select files
				</p>

			</div>}

		</div>
	);
}

export default CustomDropzone;