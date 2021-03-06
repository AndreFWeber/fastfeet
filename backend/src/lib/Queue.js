import Bee from 'bee-queue';
import NewPackageMail from '../app/jobs/NewPackageMail';
import PackageCanceledMail from '../app/jobs/PackageCancelledMail';
import redisConfig from '../config/redis';

const jobs = [NewPackageMail, PackageCanceledMail];

class Queue {
	constructor() {
		this.queues = {};
		this.init();
	}

	init() {
		jobs.forEach(({ key, handle }) => {
			this.queues[key] = {
				bee: new Bee(key, {
					redis: redisConfig,
				}),
				handle,
			};
		});
	}

	add(key, job) {
		return this.queues[key].bee.createJob(job).save();
	}

	processQueue() {
		jobs.forEach((job) => {
			const { bee, handle } = this.queues[job.key];

			bee.on('failed', this.handleFailure).process(handle);
		});
	}

	handleFailure(job, err) {
		console.log(`Queue ${job.queue.name}: FAILED`, err);
	}
}

export default new Queue();
