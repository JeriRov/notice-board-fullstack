import { Item, Items } from './items.model';

export async function saveItem(item: Item) {
  const result = await Items.insertOne(item);
  if (!result.acknowledged) {
    throw new Error('Error inserting item.');
  }
  return result;
}
