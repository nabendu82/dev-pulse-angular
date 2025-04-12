import { Timestamp } from "@angular/fire/firestore";

export class BlogPostHelper {
    // Title: This is a title for blog post
    // Result: this-is-a-title-for-blog-post-123
    static createSlug(title: string): string {
        const slug = title.toLowerCase().replace(/\s+/g, '-');
        const randomThreeDigitNumber = Math.floor(Math.random() * 1000);
        return `${slug}-${randomThreeDigitNumber}`;
    }

    static convertTimestampToDate(timestamp: Timestamp) {
        return timestamp.toDate();
    }
}
