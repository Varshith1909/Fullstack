import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        search:<T>(path: string, handler: any)=> void;
    }
}

const fastifySearchHttpMethod: FastifyPluginCallback = async (app, options, done) => {
    const search = function search<T>(path: string, handler: any) {
        app.route<T>({
            method: 'SEARCH',
            url: path,
            handler,
        });
    };

    app.decorate('search', search);
    done();
};

export const FastifySearchHttpMethodPlugin = fp(fastifySearchHttpMethod, {
    name: 'fastify-search-http-method',
});
