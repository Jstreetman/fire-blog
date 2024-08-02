"use client";
import { z } from "zod";
import { Models } from "appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useCreatePost, useUpdatePost } from "@/lib/react-queries/queries";
import { PostValidation } from "@/app/lib/validation";
import FileUploader from "./FileUploader";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUserContext();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === "Update") {
      // @ts-ignore

      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        toast({ title: "Please try again" });
      }

      return router.push(`/posts/${post.$id}`);
    }
    // @ts-ignore

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: "Please try again",
      });
    }

    router.push("/feed");
  }

  return (
    <Form {...form}>
      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photo </FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location </FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags ( separated by comma " , " ){" "}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  {...field}
                  placeholder="tag1 tag 2 tag 3"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          {/* <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button> */}
          <Button
            type="submit"
            className="rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
            disabled={isLoadingCreate || isLoadingUpdate}>
            {isLoadingCreate || (isLoadingUpdate && "Loading...")}
            {action} Post
          </Button>
        </div>
      </motion.form>
    </Form>
  );
};

export default PostForm;
