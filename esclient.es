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

POST /answers/_delete_by_query
{
    "query": {
        "match": {
            "user_id": "mbc2QnwBm8EBqcUDrpwn"
        }
    }
}

GET /questions/_search

GET /questions/_search
{
    "query": {
        "match": {
            "_id": {
                "query": "mrc2QnwBm8EBqcUDr5wB"
            }
        }
    }
}

GET /questions/_search
{
    "query": {
        "filter": {
            "_id": {
                "query": "mrc2QnwBm8EBqcUDr5wB"
            }
        }
    }
}

GET /questions/_search
{
   "query": {
      "bool": {
        //  "must": [
        //     {
        //        "_id": {
        //           "content": "abc"
        //        }
        //     }
        //  ],
         "must_not": [
            {
                "ids": {
                    "values": ["mrc2QnwBm8EBqcUDr5wB", "2"]
                }
            }
         ]
      }
   }
}