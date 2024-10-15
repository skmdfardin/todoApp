import Joi from "joi";

export const todoSchema = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).allow(""),
  completed: Joi.boolean().required(),
  createdAt: Joi.date().iso().required(),
  updatedAt: Joi.date().iso().required(),
  taskDueAt: Joi.date().iso().required(),
});

export const todoUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  description: Joi.string().max(500).allow(""),
  completed: Joi.boolean(),
});
