
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

/* builder.query() (redux)
* it’s a read operation (GET)

builder.mutation()
* POST (create a book)

* PUT/PATCH (edit a book)

* DELETE (delete a book) */

const baseQuery = fetchBaseQuery({

    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const booksApi = createApi({

    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `${id}`,
            providesTags: (results, error, id) => [{ type: "Books", id }],
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
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
            invalidatesTags: ["Books"]
        }),

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,  // error in route fixed
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })

})

export const {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation } = booksApi
export default booksApi;
