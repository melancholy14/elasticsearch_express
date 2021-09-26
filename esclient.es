GET /quotes/_search

###
GET /quotes/_search
{
    "query": {
        "match": {
            "quote": {
                "query": "love",
                "operator": "and",
                "fuzziness": "auto"
            }
        }
    }
}