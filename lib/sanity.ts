import { createClient } from "next-sanity"
const projectId = "eqzc0sr4"
const dataset = "production"
const apiVersion = "2021-10-25"

const config = {
    dataset,
    projectId,
    useCdn: true,
    apiVersion
}

export const sanityClient = createClient(config)