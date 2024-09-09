
import { Box, Alert } from "@mui/material";
import Form from "../components/Form";
import Item from "../components/Item";
import { useQuery, useMutation } from "react-query";
import {  queryClient } from "../ThemedApp";
import { useApp } from "../ThemedApp";
import { getToken ,postPost,deletePost} from "../libs/fetcher";
const api = import.meta.env.VITE_API;
export default function Home() {
    const { showForm, setGlobalMsg } = useApp();


    const { isLoading, isError, error, data } = useQuery("posts", async () => {
        const res = await fetch(`${api}/content/posts`, {
            method: 'GET', // Specify the HTTP method (GET is the default)
            headers: {
                'Content-Type': 'application/json', // Example: specify the content type
                'Authorization': 'Bearer '+getToken(), // Example: add an authorization token
                // Add any other headers you need
            },
        });
        return res.json();
    });

   

    const remove = useMutation(async id => deletePost(id), {
		onMutate: async id => {
			await queryClient.cancelQueries("posts");
			await queryClient.setQueryData("posts", old =>
				old.filter(item => item.id !== id)
			);

			setGlobalMsg("A post deleted");
		},
	});
    const add = useMutation(async content => postPost(content), {
        onSuccess: async post => {
        await queryClient.cancelQueries("posts");
        await queryClient.setQueryData("posts", old => [post, ...old]);
        setGlobalMsg("A post added");
        }
       });
    if (isError) {
        return (
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        );
    }

    if (isLoading) {
        return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
    }
    return (
        <Box>
            {showForm && <Form add={add} />}
            {data.map(item => {
                return (
                    <Item key={item.id} item={item}  remove={remove.mutate} candelete={true} />
                );
            })}
        </Box>
    );
}