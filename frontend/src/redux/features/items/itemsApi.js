
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

/* builder.query() (redux)
* it’s a read operation (GET)

builder.mutation()
* POST (create a book)

* PUT/PATCH (edit a book)

* DELETE (delete a book) */

const baseQuery = fetchBaseQuery({

    baseUrl: `${getBaseUrl()}/api/items`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const itemsApi = createApi({

    reducerPath: 'itemsApi',
    baseQuery,
    tagTypes: ['Items'],
    endpoints: (builder) => ({
        fetchAllItems: builder.query({
            query: () => "/",
            providesTags: ["Items"]
        }),
        fetchItemById: builder.query({
            query: (id) => `${id}`,
            providesTags: (results, error, id) => [{ type: "Items", id }],
        }),
        addItem: builder.mutation({
            query: (newBook) => ({
                url: `/create-item`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Items"]
        }),
        updateItem: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-type': 'application/json'
                }
            }),
            invalidatesTags: ["Items"]
        }),

        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,  // error in route fixed
                method: "DELETE"
            }),
            invalidatesTags: ["Items"]
        })
    })

})

export const {
    useFetchAllItemsQuery,
    useFetchItemByIdQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation } = itemsApi
export default itemsApi;
