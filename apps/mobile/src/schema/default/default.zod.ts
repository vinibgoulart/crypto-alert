/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * crypto alert
 * OpenAPI spec version: 1.0.0
 */
import {
  z as zod
} from 'zod'

export const postAuthRegisterBodyPasswordMin = 6;


export const postAuthRegisterBody = zod.object({
  "name": zod.string(),
  "email": zod.string().email(),
  "phone": zod.string(),
  "password": zod.string().min(postAuthRegisterBodyPasswordMin)
})

export const postAuthRegisterResponse = zod.object({
  "message": zod.string()
})

export const postAuthLoginBodyPasswordMin = 6;


export const postAuthLoginBody = zod.object({
  "email": zod.string().email(),
  "password": zod.string().min(postAuthLoginBodyPasswordMin)
})

export const postAuthLoginResponse = zod.object({
  "message": zod.string()
})

export const postAuthLogoutResponse = zod.object({
  "message": zod.string()
})

export const postAlertBody = zod.object({
  "name": zod.string(),
  "price": zod.number(),
  "symbol": zod.string()
})

export const postAlertResponse = zod.object({
  "_id": zod.string(),
  "price": zod.number(),
  "symbol": zod.string()
})

export const getAlertsQueryParams = zod.object({
  "status": zod.string().optional(),
  "page": zod.string().optional()
})

export const getAlertsResponse = zod.object({
  "data": zod.array(zod.object({
  "_id": zod.string(),
  "price": zod.number(),
  "symbol": zod.string(),
  "status": zod.string(),
  "currentPrice": zod.string(),
  "differencePrice": zod.string(),
  "reachedAt": zod.string(),
  "createdAt": zod.string()
})),
  "nextPage": zod.string().nullable()
})

export const getCryptosQueryParams = zod.object({
  "symbol": zod.string().optional(),
  "page": zod.string().optional()
})

export const getCryptosResponse = zod.object({
  "data": zod.array(zod.object({
  "symbol": zod.string(),
  "price": zod.string(),
  "updatedAt": zod.string()
})),
  "nextPage": zod.string().nullable()
})

export const getUserMeResponse = zod.object({
  "_id": zod.string(),
  "name": zod.string(),
  "email": zod.string().email(),
  "phone": zod.string(),
  "notification": zod.object({
  "email": zod.boolean(),
  "sms": zod.boolean(),
  "pushNotification": zod.boolean()
}),
  "createdAt": zod.string()
})

