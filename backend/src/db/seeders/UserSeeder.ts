import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User } from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.create(User, {
			name: "xyz",
			email: "med2@email.com",
		});

		em.create(User, {
			name: "abc",
			email: "meda@email.com",
		});

		em.create(User, {
			name: "efg",
			email: "mede@email.com",
		});

		em.create(User, {
			name: "yuw",
			email: "medy@email.com",
		});
	}
}
