GET /questions/_search

GET /users/_search
{
    "query": {
        "match": {
            "email": {
                "query": "tester@data-bank.ai",
                "operator": "and",
                "fuzziness": "auto"
            }
        }
    }
}

GET /answers/_search

###
GET /questions/_search
{
    "query": {
        "match": {
            "_id": {
                "query": "ydoJM3wBHpNDTeASeq54"
            }
        }
    }
}