import { Levels, Pet, PetAge, PetEnvironment } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { PetRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetRepository {
	async findById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				breed: true,
				about: true,
				age: true,
				size: true,
				independence_level: true,
				energy_level: true,
				environment: true,
				adopted_in: true,
				adoption_requirements: true,
				organization_id: false,
				organization: {
					select: {
						id: true,
						name: true,
						city: true,
						uf: true,
					},
				},
			},
		})

		return pet
	}

	async findMany(
		city: string,
		uf: string,
		breed?: string,
		age?: PetAge,
		size?: Levels,
		independence_level?: Levels,
		energy_level?: Levels,
		environment?: PetEnvironment,
	): Promise<Pet[] | null> {
		const pets = await prisma.pet.findMany({
			where: {
				breed,
				age,
				size,
				independence_level,
				energy_level,
				environment,
				adopted_in: null,
				organization: {
					city,
					uf,
				},
			},
			include: {
				organization: {
					select: {
						city: true,
						uf: true,
					},
				},
			},
		})

		return pets
	}
}
