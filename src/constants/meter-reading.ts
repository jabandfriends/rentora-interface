import z from 'zod'

export const meterReadingFormSchema = z
  .object({
    rooms: z.array(
      z.object({
        unitId: z.string(),
        unitName: z.string(),
        unitStatus: z.string(),
        waterStart: z.number().optional(),
        waterEnd: z.number().optional(),
        electricStart: z.number().optional(),
        electricEnd: z.number().optional(),
      }),
    ),
  })
  .superRefine((data, ctx) => {
    data.rooms.forEach((room, index) => {
      // ===== Water validation =====
      if (room.waterStart && room.waterStart !== 0) {
        if (!room.waterEnd || room.waterEnd === 0) {
          ctx.addIssue({
            code: 'custom',
            message: 'Water end must be defined if water start is defined',
            path: ['rooms', index, 'waterEnd'],
          })
        } else if (room.waterEnd <= room.waterStart) {
          ctx.addIssue({
            code: 'custom',
            message: 'Water end must be greater than water start',
            path: ['rooms', index, 'waterEnd'],
          })
        }
      }

      // ===== Electric validation =====
      if (room.electricStart && room.electricStart !== 0) {
        if (!room.electricEnd || room.electricEnd === 0) {
          ctx.addIssue({
            code: 'custom',
            message: 'Electric end must be defined if electric start is defined',
            path: ['rooms', index, 'electricEnd'],
          })
        } else if (room.electricEnd <= room.electricStart) {
          ctx.addIssue({
            code: 'custom',
            message: 'Electric end must be greater than electric start',
            path: ['rooms', index, 'electricEnd'],
          })
        }
      }
    })
  })

export const filterMeterReadingFormSchema = z.object({
  buildingName: z.string().optional(),
  year: z.string().optional(),
  month: z.string().optional(),
})

export const updateMeterReadingFormSchema = z
  .object({
    waterUnitUtilityId: z.string().min(1, 'Water unit is required'),
    waterStart: z.number({ error: 'Water start is required' }).min(0, 'Must be 0 or greater'),
    waterEnd: z.number({ error: 'Water end is required' }).min(0, 'Must be 0 or greater'),
    electricUnitUtilityId: z.string().min(1, 'Electric unit is required'),
    electricStart: z.number({ error: 'Electric start is required' }).min(0, 'Must be 0 or greater'),
    electricEnd: z.number({ error: 'Electric end is required' }).min(0, 'Must be 0 or greater'),
  })
  .superRefine((data, ctx) => {
    // 🔹 Water
    if (data.waterStart > data.waterEnd) {
      ctx.addIssue({
        code: 'custom',
        path: ['waterEnd'],
        message: 'Water end must be greater than or equal to start',
      })
    }

    // 🔹 Electric
    if (data.electricStart > data.electricEnd) {
      ctx.addIssue({
        code: 'custom',
        path: ['electricEnd'],
        message: 'Electric end must be greater than or equal to start',
      })
    }
  })
