import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleAuthorInfo extends Struct.ComponentSchema {
  collectionName: 'components_article_author_infos';
  info: {
    description: 'Informacje o autorze artyku\u0142u';
    displayName: 'Author Info';
    icon: 'user';
  };
  attributes: {
    academicTitle: Schema.Attribute.Enumeration<
      [
        'dr',
        'dr hab.',
        'prof. dr hab.',
        'mgr',
        'in\u017C.',
        'mgr in\u017C.',
        'lic.',
      ]
    >;
    avatar: Schema.Attribute.Media<'images'>;
    bio: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    linkedin: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Ekspert KSeF'>;
    website: Schema.Attribute.String;
  };
}

export interface ArticleComment extends Struct.ComponentSchema {
  collectionName: 'components_article_comments';
  info: {
    description: 'Komentarz u\u017Cytkownika do artyku\u0142u';
    displayName: 'Comment';
    icon: 'message';
  };
  attributes: {
    authorAvatar: Schema.Attribute.Media<'images'>;
    authorEmail: Schema.Attribute.Email & Schema.Attribute.Required;
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    isApproved: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
  };
}

export interface SharedAuthor extends Struct.ComponentSchema {
  collectionName: 'components_shared_authors';
  info: {
    description: 'Article author information';
    displayName: 'Author';
    icon: 'user';
  };
  attributes: {
    avatar: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    bio: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    role: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

export interface SharedRating extends Struct.ComponentSchema {
  collectionName: 'components_shared_ratings';
  info: {
    description: 'Article rating information';
    displayName: 'Rating';
    icon: 'star';
  };
  attributes: {
    average: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    count: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article.author-info': ArticleAuthorInfo;
      'article.comment': ArticleComment;
      'shared.author': SharedAuthor;
      'shared.rating': SharedRating;
    }
  }
}
