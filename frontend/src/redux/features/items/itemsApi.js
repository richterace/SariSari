
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
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Items"]
        }),
        fetchBookById: builder.query({
            query: (id) => `${id}`,
            providesTags: (results, error, id) => [{ type: "Items", id }],
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-item`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Items"]
        }),
        updateBook: builder.mutation({
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

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,  // error in route fixed
                method: "DELETE"
            }),
            invalidatesTags: ["Items"]
        })
    })

})

export const {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation } = itemsApi
export default itemsApi;
