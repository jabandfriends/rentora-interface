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
