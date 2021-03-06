const MaxCallPerMinutes = 30;
/**
 * Limiting the frequency of interface calls
 */
module.exports = function () {
    let callTimes = {};
    setInterval(() => callTimes = {}, 60000); // Emptying every 60 seconds

    return async (ctx, next) => {
        // robot10
        if (ctx.socket.user === '5adad39555703565e7903f79') {
            return next();
        }

        const socketId = ctx.socket.id;
        const count = callTimes[socketId] || 0;
        if (count >= MaxCallPerMinutes) {
            return ctx.res = '接口调用频繁';
        }
        callTimes[socketId] = count + 1;
        await next();
    };
};
