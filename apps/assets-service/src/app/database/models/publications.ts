import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreatePublicationValidation } from '@common';

@Schema({ timestamps: true, versionKey: false, collectionOptions: { dbName: 'publications' } })
export class MongoDbPublications implements CreatePublicationValidation {
  @Prop({ type: String, required: true })
  categoryAirline: string;

  @Prop({ type: String, required: true })
  categoryProcurement: string;

  @Prop({ type: String, required: true })
  distributor: string;

  @Prop({ type: [String], required: true })
  genre: string[];

  @Prop({ type: String, required: true })
  lab: string;

  @Prop({ type: [String], required: true })
  language: string[];

  @Prop({ type: Boolean, required: true, default: false })
  needDrm: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  needWireless: boolean;

  @Prop({ type: String, required: false })
  notes: string;

  @Prop({ type: String, required: true, maxlength: 300 })
  originalSynopsis: string;

  @Prop({ type: String, required: true })
  originalTitle: string;

  @Prop({ type: String, required: true })
  originCountry: string;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const MongoDbPublicationsSchema = SchemaFactory.createForClass(MongoDbPublications);
