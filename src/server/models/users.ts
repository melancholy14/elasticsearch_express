import { esclient, index, user_type } from '../../elastic';

export async function getUsers(req) {
    const query = {};

    const { body: { hits = {} } = {} } = await esclient.search({
        from: req.page || 0,
        size: req.limit || 100,
        index,
        type: user_type,
        body: query,
    });

    const results = hits.total.value;

    const values = hits.hits.map(hit => ({
        id: hit._id,
        email: hit._source.email,
    }));

    return {
        results,
        values,
    }
}

export async function getUser(id: string) {
    const query = {
        query: {
            match: {
                id: {
                    query: id,
                }
            }
        }
    };

    const { body: { hits = {} } = {} } = await esclient.search({
        index,
        type: user_type,
        body: query,
    });

    const results = hits.total.value;

    const values = hits.hits.map(hit => ({
        id: hit._id,
        email: hit._source.email
    }));

    return {
        results,
        values,
    };
}
