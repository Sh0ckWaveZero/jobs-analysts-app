import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignInForm({
	onSwitchToSignUp,
}: {
	onSwitchToSignUp: () => void;
}) {
	const router = useRouter();
	const { isPending } = authClient.useSession();

	const form = useForm({
		defaultValues: {
			identifier: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			// ตรวจสอบว่า identifier เป็นอีเมลหรือไม่
			const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.identifier);

			if (isEmail) {
				// เข้าสู่ระบบด้วยอีเมล
				await authClient.signIn.email(
					{
						email: value.identifier,
						password: value.password,
					},
					{
						onSuccess: () => {
							router.push("/dashboard");
							toast.success("เข้าสู่ระบบสำเร็จ");
						},
						onError: (error) => {
							toast.error(error.error.message);
						},
					},
				);
			} else {
				// เข้าสู่ระบบด้วยชื่อผู้ใช้
				await authClient.signIn.username(
					{
						username: value.identifier,
						password: value.password,
					},
					{
						onSuccess: () => {
							router.push("/dashboard");
							toast.success("เข้าสู่ระบบสำเร็จ");
						},
						onError: (error) => {
							toast.error(error.error.message);
						},
					},
				);
			}
		},
		validators: {
			onSubmit: z.object({
				identifier: z.string().min(3, "กรุณาใส่อีเมลหรือชื่อผู้ใช้ที่ถูกต้อง"),
				password: z.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"),
			}),
		},
	});

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className="mx-auto mt-10 w-full max-w-md p-6">
			<h1 className="mb-6 text-center font-bold text-3xl">ยินดีต้อนรับกลับ</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					void form.handleSubmit();
				}}
				className="space-y-4"
			>
				<div>
					<form.Field name="identifier">
						{(field) => (
							<div className="space-y-2">
								<Label htmlFor={field.name}>อีเมลหรือชื่อผู้ใช้</Label>
								<Input
									id={field.name}
									name={field.name}
									placeholder="กรอกอีเมลหรือชื่อผู้ใช้ของคุณ"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{field.state.meta.errors.map((error) => (
									<p key={error?.message} className="text-red-500">
										{error?.message}
									</p>
								))}
							</div>
						)}
					</form.Field>
				</div>

				<div>
					<form.Field name="password">
						{(field) => (
							<div className="space-y-2">
								<Label htmlFor={field.name}>รหัสผ่าน</Label>
								<Input
									id={field.name}
									name={field.name}
									type="password"
									placeholder="กรอกรหัสผ่านของคุณ"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{field.state.meta.errors.map((error) => (
									<p key={error?.message} className="text-red-500">
										{error?.message}
									</p>
								))}
							</div>
						)}
					</form.Field>
				</div>

				<form.Subscribe>
					{(state) => (
						<Button
							type="submit"
							className="w-full"
							disabled={!state.canSubmit || state.isSubmitting}
						>
							{state.isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
						</Button>
					)}
				</form.Subscribe>
			</form>

			<div className="mt-4 text-center">
				<Button
					variant="link"
					onClick={onSwitchToSignUp}
					className="text-indigo-600 hover:text-indigo-800"
				>
					ยังไม่มีบัญชี? ลงทะเบียน
				</Button>
			</div>
		</div>
	);
}
