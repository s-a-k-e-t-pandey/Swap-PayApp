import express from 'express'
import db from '@repo/db/client'

const app = express()

app.use(express.json())

app.post('/hdfcWebhook', async(req, res) => {
    const token = req.body.token 
    const onRampTransaction = await db.onRampTransaction.findFirst({
        where: {
            token: token
        }
    })
    const userId = onRampTransaction?.userId
    const amount = onRampTransaction?.amount

    try { 
        await db.$transaction([
            // update your wallet balance 
            db.balance.update({
                where: {
                    userId: Number(userId)
                },
                data: {
                    amount: {
                        increment: Number(amount)
                    }
                }
            }),
    
            // log the transaction in OnRampTransactions
            db.onRampTransaction.update({
                where: {
                    token: token
                },
                data: {
                    status: "Success"
                }
            })
        ])

        res.status(200).json({
            message: 'captured'
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3003)