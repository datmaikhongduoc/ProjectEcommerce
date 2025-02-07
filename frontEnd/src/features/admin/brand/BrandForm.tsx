import { useForm } from "react-hook-form";
import { IBrand } from "@/interfaces";
import { Button, Form, FormRow, Input, InputFile } from "@/components/shared";
import { UseBrandApi } from "@/apis-use";

interface IProps {
  brandEdit?: IBrand;
  onCloseModal?: () => void;
}

const initializeFormBrand: IBrand = {
  _id: "",
  brand_image: "",
  brand_name: "",
  brand_origin: "",
};

export function BrandForm(props: IProps) {
  const { createBrand, isCreatingBrand } = UseBrandApi.createBrand();
  const { updateBrand, isUpdatingBrand } = UseBrandApi.updateBrand();

  const { _id: editId, ...editValue } = props.brandEdit || initializeFormBrand;

  console.log(editValue);

  const isEditSession = Boolean(editId);

  const { handleSubmit, register, formState } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  const { errors: errorsForm } = formState;

  const isWorking = isCreatingBrand || isUpdatingBrand;

  const onSubmit = (
    dataFormBrand: Pick<IBrand, "brand_image" | "brand_name" | "brand_origin">
  ) => {
    // Create Brand
    if (!isEditSession) {
      return createBrand(
        { ...dataFormBrand, brand_image: dataFormBrand["brand_image"] },
        {
          onSuccess: (newBrand) => {
            console.log("newBrand::", newBrand);
            props.onCloseModal?.();
          },
        }
      );
    } else {
      return updateBrand(
        {
          ...dataFormBrand,
          brand_image: dataFormBrand["brand_image"] || editValue.brand_image,
          _id: editId,
        },
        {
          onSuccess: (brandUpdated) => {
            console.log("brandUpdated::", brandUpdated);
            props.onCloseModal?.();
          },
        }
      );
    }
  };

  const onError = (errors: any) => {
    console.error(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      $type={props.onCloseModal && "modal"}
    >
      <FormRow label="Brand Name" error={errorsForm.brand_name}>
        <Input
          type="text"
          id="brandName"
          {...register("brand_name", {
            required: "Please provide brand name",
          })}
        />
      </FormRow>
      <FormRow label="Brand Origin" error={errorsForm.brand_origin}>
        <Input
          type="text"
          id="brandOrigin"
          {...register("brand_origin", {
            required: "Please provide brand origin",
          })}
        />
      </FormRow>
      {!isEditSession ? (
        <FormRow label="Brand Image" error={errorsForm.brand_image}>
          <InputFile
            id="imageBrand"
            register={register("brand_image", {
              required: "Please provide brand origin",
            })}
          />
        </FormRow>
      ) : (
        <FormRow label="Brand Image">
          <InputFile id="imageBrand" register={register("brand_image")} />
        </FormRow>
      )}
      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={props.onCloseModal}
        >
          Cancel
        </Button>
        {!isEditSession ? (
          <Button disabled={isWorking}>
            {isWorking ? "Creating ...." : "Create brand"}
          </Button>
        ) : (
          <Button disabled={isWorking}>
            {isWorking ? "Editing ...." : "Edit brand"}
          </Button>
        )}
      </FormRow>
    </Form>
  );
}
