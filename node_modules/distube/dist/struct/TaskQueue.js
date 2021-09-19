"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskQueue = void 0;
class Task {
    constructor(resolveInfo) {
        this.resolveInfo = resolveInfo;
        this.promise = new Promise(res => {
            this.resolve = res;
        });
    }
}
/**
 * Task queuing system
 * @private
 */
class TaskQueue {
    constructor() {
        /**
         * The task array
         * @type {Task[]}
         * @private
         */
        this.tasks = [];
    }
    /**
     * Waits for last task finished and queues a new task
     * @param {boolean} [resolveInfo=false] Whether the task is a resolving info task
     * @returns {Promise<void>}
     */
    queuing(resolveInfo = false) {
        const next = this.remaining ? this.tasks[this.tasks.length - 1].promise : Promise.resolve();
        this.tasks.push(new Task(resolveInfo));
        return next;
    }
    /**
     * Removes the finished task and processes the next task
     */
    resolve() {
        var _a;
        (_a = this.tasks.shift()) === null || _a === void 0 ? void 0 : _a.resolve();
    }
    /**
     * The remaining number of tasks
     * @type {number}
     */
    get remaining() {
        return this.tasks.length;
    }
    /**
     * Whether or not having a resolving info task
     * @type {boolean}
     */
    get hasResolveTask() {
        return !!this.tasks.find(t => t.resolveInfo);
    }
}
exports.TaskQueue = TaskQueue;
//# sourceMappingURL=TaskQueue.js.map