"use client";

import { deleteProduct } from "@/actions/productActions";
import { deleteCategory } from "@/actions/categoryActions";
import { deleteBlogPost } from "@/actions/blogActions";
import { deleteCrop } from "@/actions/cropActions";
import { deleteInquiry } from "@/actions/inquiryActions";
import { deleteExpertArticle } from "@/actions/expertArticleActions";
import { deletePage } from "@/actions/pageActions";
import { deleteJobOffer } from "@/actions/jobOfferActions";
import { useState } from "react";

type DeleteType = 'product' | 'category' | 'blog' | 'crop' | 'inquiry' | 'expert-article' | 'page' | 'job-offer';

export default function DeleteButton({ id, type }: { id: string, type: DeleteType }) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

        setIsDeleting(true);
        try {
            switch (type) {
                case 'product': await deleteProduct(id); break;
                case 'category': await deleteCategory(id); break;
                case 'blog': await deleteBlogPost(id); break;
                case 'crop': await deleteCrop(id); break;
                case 'inquiry': await deleteInquiry(id); break;
                case 'expert-article': await deleteExpertArticle(id); break;
                case 'page': await deletePage(id); break;
                case 'job-offer': await deleteJobOffer(id); break;
            }
        } catch {
            alert(`Failed to delete ${type}`);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{ color: '#ef4444', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}
        >
            {isDeleting ? '...' : 'Delete'}
        </button>
    );
}
