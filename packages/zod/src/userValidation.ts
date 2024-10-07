import z from "zod"

const userValidation = z.object({
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    // Contains at least one lowercase letter ((?=.*[a-z]))
    // Contains at least one uppercase letter ((?=.*[A-Z]))
    // Contains at least one digit ((?=.*\d))
    // Has a minimum length of 8 characters (.{8,})
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
})

export type userCredential = z.infer<typeof userValidation>

export default userValidation;
