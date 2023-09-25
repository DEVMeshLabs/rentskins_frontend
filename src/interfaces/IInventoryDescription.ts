export interface ITag {
  category: string
  internal_name: string
  localized_category_name: string
  localized_tag_name: string
}

export interface ITagsData {
  tags: ITag[]
}
