import { useEffect, useState } from "react";
import Dropzone, { FileWithPath } from "react-dropzone";

const DropzoneImage = () => {
	const [files, setFiles] = useState<FileWithPath[]>([]);

	const [filePreviews, setFilePreviews] = useState<string[]>([]);



	useEffect(() => {
		const loadFile = (file: FileWithPath) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				setFilePreviews((prevPreviews) => [...prevPreviews, reader.result as string]);
			};
			reader.readAsDataURL(file);
		};

		files.forEach((file) => {
			loadFile(file);
		});
	}, [files]);

	return (
		<>
			<Dropzone onDrop={(acceptedFiles) => setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])}>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Drag drop some files here, or click to select files</p>
						</div>
					</section>
				)}
			</Dropzone>
			<div>
				{filePreviews.map((preview, index) => (
					<img key={index} src={preview} alt={`Preview ${index}`} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
				))}
			</div>
		</>
	);
};

export default DropzoneImage;
