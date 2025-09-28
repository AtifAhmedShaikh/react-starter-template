import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/ui/date-picker";
import { Loader2 } from "lucide-react";

const GenericForm = ({
  title,
  fields = [],
  defaultValues = {},
  validationSchema,
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  loading = false,
  className = "",
  layout = "vertical", // vertical, horizontal, grid
  showActions = true,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues,
  });

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleFormCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      reset();
    }
  };

  const renderField = (field) => {
    const fieldProps = {
      ...field.props,
      ...register(field.name),
      className: `w-full ${field.className || ''}`,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              {...fieldProps}
              type={field.type}
              placeholder={field.placeholder}
              disabled={field.disabled}
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name].message}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              {...fieldProps}
              placeholder={field.placeholder}
              rows={field.rows || 3}
              disabled={field.disabled}
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name].message}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={watch(field.name)}
              onValueChange={(value) => setValue(field.name, value)}
              disabled={field.disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name].message}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={watch(field.name)}
              onCheckedChange={(checked) => setValue(field.name, checked)}
              disabled={field.disabled}
            />
            <Label htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {field.label}
            </Label>
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name].message}</p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.name} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <RadioGroup
              value={watch(field.name)}
              onValueChange={(value) => setValue(field.name, value)}
              disabled={field.disabled}
            >
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                  <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name].message}</p>
            )}
          </div>
        );

      case 'switch':
        return (
          <div key={field.name} className="flex items-center space-x-2">
            <Switch
              id={field.name}
              checked={watch(field.name)}
              onCheckedChange={(checked) => setValue(field.name, checked)}
              disabled={field.disabled}
            />
            <Label htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {field.label}
            </Label>
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name].message}</p>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <DatePicker
              value={watch(field.name)}
              onChange={(date) => setValue(field.name, date)}
              disabled={field.disabled}
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name].message}</p>
            )}
          </div>
        );

      case 'custom':
        return (
          <div key={field.name} className="space-y-2">
            {field.render && field.render({ field, control, watch, setValue, errors })}
          </div>
        );

      default:
        return null;
    }
  };

  const getLayoutClass = () => {
    switch (layout) {
      case 'horizontal':
        return 'grid grid-cols-1 md:grid-cols-2 gap-4';
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      default:
        return 'space-y-4';
    }
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className={getLayoutClass()}>
            {fields.map(renderField)}
          </div>

          {showActions && (
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleFormCancel}
                disabled={loading}
              >
                {cancelText}
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[100px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  submitText
                )}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default GenericForm;
