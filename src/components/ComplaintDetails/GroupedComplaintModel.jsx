import { Button } from "@/components/ui/button";
import { HTTP_METHODS } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ModalWrapper from "../reuseable/ModalWrapper";

export default function GroupComplaintsModal({ isOpen, onClose, refNumber, complaintGroupId = "" }) {
    const [refNos, setRefNos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComplaintsGroup = async () => {
            const response = await apiHandler(COMPLAINT_APIS.GET_GROUP_COMAPLAINTS, {
                params: { groupId: complaintGroupId }
            });
            if (!response.success) return toast.error(response.message);
            setRefNos(Array.isArray(response.data) ? response.data?.map((item) => item.refNo) : []);
        };
        fetchComplaintsGroup();
    }, []);

    const addRefNo = () => {
        // if input value is equals to the current ref number, then don't add it
        if (inputValue?.trim() === refNumber) {
            toast.error("You can't add the reference number of the current complaint.");
            return;
        }
        if (inputValue.trim() && !refNos.includes(inputValue.trim())) {
            setRefNos([...refNos, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeRefNo = (refNo) => {
        if(refNo===refNumber)return toast.error("You can't remove the reference number of the current complaint.");
        setRefNos(refNos.filter(r => r !== refNo));
    };

    const handleSubmit = async () => {
        if (!Array.isArray(refNos) || !refNos?.length) {
            toast.error("You need at least 1 complaints to create a group.");
            return;
        }
        setLoading(true);
        const response = await apiHandler(COMPLAINT_APIS.CREATE_GROUPED, {
            method: HTTP_METHODS.POST,
            data: { refNos: [...refNos, refNumber] }
        });
        setLoading(false);
        if (!response.success) return toast.error(response.message);
        toast.success(response.message);
        setRefNos([]);
        onClose();
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} className="">
            <p className="mt-2 text-sm text-gray-600">
                Enter the <strong>RefNos</strong> of complaints you want to group:
            </p>

            {/* Input field + Add button */}
            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Enter RefNo"
                    value={inputValue}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Only allow numbers and hyphens
                        if (/^[0-9-]*$/.test(value)) {
                            setInputValue(value);
                        }
                    }}
                    className="border rounded p-2 flex-1 text-sm"
                />
                <Button onClick={addRefNo}>Add</Button>
            </div>

            {/* List of added RefNos */}
            <div className="mt-4 space-y-2">
                {refNos.map((refNo) => (
                    <div
                        key={refNo}
                        className="flex justify-between items-center bg-gray-100 p-2 rounded"
                    >
                        <span className="font-mono">{refNo}</span>
                        <button
                            onClick={() => removeRefNo(refNo)}
                            className="text-red-500 text-sm hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer buttons */}
            <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!refNos?.length} loading={loading}>Confirm</Button>
            </div>
        </ModalWrapper>
    );
}
