"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Form, FormSubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const CreateTypeForm = ({ title }: { title?: string }) => {
  const [cardTitle, setCardTitle] = useState(title ?? "Create post type");
  const [typeName, setType] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <Card className="">
      <CardContent>
        <h2 className="text-2xl">{cardTitle}</h2>
        <form
          method="post"
          onSubmit={(e: any) => {
            console.log(e);
            console.log(typeName);
          }}
          className="flex flex-col gap-2 pt-4"
        >
          <div className="pt-2 flex flex-col gap-2">
            <Label className="font-semibold pb-2">Type {cardTitle}</Label>
            <Input
              name="type"
              type="text"
              placeholder={`Create ${title} type`}
              value={typeName}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Label className="font-semibold pb-2">Slug</Label>
            <Input
              name="slug"
              type="text"
              placeholder={`slug`}
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
              }}
            />
          </div>
          <Button className="mt-4" type="submit" name="submit" disabled={false}>
            Create
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { CreateTypeForm };
