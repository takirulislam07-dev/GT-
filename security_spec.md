# Security Specification - Green Touch

## Data Invariants
- A Product must have a valid `artist` ID.
- A Review cannot exist without a valid `productId` and `userId`.
- Only Admins can create/update Products.
- Users can only read their own Orders and Profiles.
- Reviews can only be created by signed-in users.
- BlogPosts can only be managed by Admins.

## The "Dirty Dozen" Payloads (Deny Tests)
1. **Identity Spoofing**: Creating a product with someone else's artist name/ID.
2. **Shadow Field**: Adding `isVerified: true` to a user profile or product.
3. **Invalid ID**: Using a 2KB string as a product ID.
4. **Price Manipulation**: Updating a product price to $0 (unauthorized).
5. **State Shortcut**: Moving an order from 'pending' to 'delivered' as a regular user.
6. **Orphaned Review**: Creating a review for a non-existent product.
7. **Recursive Attack**: Attempting to list all users without being an admin.
8. **PII Leak**: Accessing another user's email via a direct get request.
9. **Admin Escallation**: Setting `role: 'admin'` on your own user document.
10. **Ghost Review**: Updating a review you didn't write.
11. **Mass Delete**: Attempting to delete a product collection root.
12. **Timestamp Fraud**: Providing a manual `createdAt` date from 1999.
