import { LucidRow, ModelQueryBuilderContract, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon';
import Logger from '@ioc:Adonis/Core/Logger'

// Optional null check query
export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}

export const softDelete = async (row: LucidRow, column: string = 'deletedAt') => {
  Logger.warn(`Soft deleting row: ${row.constructor.name} with id: ${row.$attributes.id}`)
  row[column] = DateTime.local()
  await row.save()
}

export const softDeleteRecord = async (record: LucidRow, returnUrl: string) => {
  const ctx = HttpContext.get()
  if (!ctx) {
    return console.log('no ctx contract')
  } else {
    console.log('ctx contract found')
  }

  try {
    const deletedRecord = record
    await record.delete()
    ctx.logger.info({ recordId: deletedRecord.$attributes.id, record: deletedRecord, deleted_by: ctx.auth.user?.id, deletedAt: deletedRecord.$attributes.deletedAt }, 'Record successfully deleted')
    ctx.session.flash('message', {
      type: 'success',
      description: 'record successfully deleted.'
    })
    return ctx.response.redirect().toPath(returnUrl || '/admin/users')
  } catch (error) {
    ctx.logger.info({ record: record.$attributes.id, deleted_by: ctx.auth.user?.id }, 'User successfully deleted')
    ctx.session.flash('message', {
      type: 'error',
      description: 'Something went wrong.'
    })
    return ctx.response.redirect().back()
  }
}