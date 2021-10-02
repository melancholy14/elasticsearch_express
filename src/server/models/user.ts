import { esclient, userIndex as index, userType as type } from "../../elastic";

export async function getUsers({
  query,
  page,
  limit,
}: {
  query: Record<string, string>;
  page: number;
  limit: number;
}) {
  const { body: { hits = {} } = {} } = await esclient.search({
    from: page,
    size: limit,
    index,
    type,
    body: query,
  });

  const results = hits.total.value;

  const values = hits.hits.map((hit) => ({
    id: hit._id,
    email: hit._source.email,
  }));

  return {
    results,
    values,
  };
}

export async function getUser({
  field,
  value,
}: {
  field: string;
  value: string;
}) {
  const query = {
    query: {
      match: {
        [field]: {
          query: value,
          operator: "and",
          fuzziness: "auto",
        },
      },
    },
  };

  const { body: { hits = {} } = {} } = await esclient.search({
    index,
    type,
    body: query,
  });

  const results = hits.total.value;

  const values = hits.hits.map((hit) => ({
    id: hit._id,
    email: hit._source.email,
    password: hit._source.password,
  }));

  return {
    results,
    values,
  };
}
