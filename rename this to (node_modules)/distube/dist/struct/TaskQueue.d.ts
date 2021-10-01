/**
 * Task queuing system
 * @private
 */
export declare class TaskQueue {
    /**
     * The task array
     * @type {Task[]}
     * @private
     */
    private tasks;
    /**
     * Waits for last task finished and queues a new task
     * @param {boolean} [resolveInfo=false] Whether the task is a resolving info task
     * @returns {Promise<void>}
     */
    queuing(resolveInfo?: boolean): Promise<void>;
    /**
     * Removes the finished task and processes the next task
     */
    resolve(): void;
    /**
     * The remaining number of tasks
     * @type {number}
     */
    get remaining(): number;
    /**
     * Whether or not having a resolving info task
     * @type {boolean}
     */
    get hasResolveTask(): boolean;
}
//# sourceMappingURL=TaskQueue.d.ts.map