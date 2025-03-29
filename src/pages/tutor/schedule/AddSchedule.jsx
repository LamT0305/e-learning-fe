import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  message,
  Tooltip,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import useSchedule from "../../../redux/hooks/useSchedule";
import useAllocation from "../../../redux/hooks/useAllocation";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

function AddSchedule({ onClose }) {
  const [form] = Form.useForm();
  const { handleCreateSchedule } = useSchedule();
  const {
    allocatedStudents,
    fetchAllocatedStudents,
    isLoading: fetchingStudents,
  } = useAllocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllocatedStudents();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const scheduleData = {
        ...values,
        startTime: values.startTime.toISOString(),
        endTime: values.endTime.toISOString(),
        sessionDuration: Math.round(
          dayjs(values.endTime).diff(values.startTime, "minute")
        ),
      };
      handleCreateSchedule(scheduleData);
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create schedule"
      );
    } finally {
      setLoading(false);
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledTime = (current, type) => {
    if (type === "start" && dayjs(current).isSame(dayjs(), "day")) {
      const currentHour = dayjs().hour();
      const currentMinute = dayjs().minute();
      return {
        disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
        disabledMinutes: () =>
          currentHour === dayjs().hour()
            ? Array.from({ length: currentMinute }, (_, i) => i)
            : [],
      };
    }
    return {};
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="max-w-2xl mx-auto p-6"
    >
      <Form.Item
        name="studentId"
        label="Student"
        rules={[{ required: true, message: "Please select a student" }]}
        tooltip={{
          title: "Select a student from your allocated list",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Select
          placeholder={
            fetchingStudents ? "Loading students..." : "Select student"
          }
          className="w-full"
          showSearch
          loading={fetchingStudents}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          notFoundContent={
            fetchingStudents ? "Loading..." : "No students found"
          }
        >
          {allocatedStudents?.map((student) => (
            <Option key={student._id} value={student.student_id._id}>
              {student.student_id.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="subject"
        label="Subject"
        rules={[{ required: true, message: "Please enter the subject" }]}
      >
        <Input placeholder="Enter subject" className="w-full" maxLength={100} />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: "Please select start time" }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            className="w-full"
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
            disabledTime={(time) => disabledTime(time, "start")}
            minuteStep={15}
            placeholder="Select start time"
          />
        </Form.Item>

        <Form.Item
          name="endTime"
          label="End Time"
          rules={[
            { required: true, message: "Please select end time" },
            {
              validator: async (_, value) => {
                const startTime = form.getFieldValue("startTime");
                if (startTime && value) {
                  const duration = dayjs(value).diff(
                    dayjs(startTime),
                    "minute"
                  );
                  if (duration <= 0) {
                    throw new Error("End time must be after start time");
                  }
                  if (duration < 30) {
                    throw new Error("Session must be at least 30 minutes");
                  }
                  if (duration > 180) {
                    throw new Error("Session cannot exceed 3 hours");
                  }
                }
              },
            },
          ]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            className="w-full"
            format="YYYY-MM-DD HH:mm"
            disabledDate={(current) => {
              const startTime = form.getFieldValue("startTime");
              if (!startTime) return false;
              return current && current.isBefore(startTime, "day");
            }}
            disabledTime={(current) => {
              const startTime = form.getFieldValue("startTime");
              if (!startTime || !current) return {};

              if (current.isSame(startTime, "day")) {
                return {
                  disabledHours: () =>
                    Array.from({ length: startTime.hour() }, (_, i) => i),
                };
              }
              return {};
            }}
            minuteStep={15}
            placeholder="Select end time"
          />
        </Form.Item>
      </div>

      <Form.Item
        name="meetingType"
        label="Meeting Type"
        rules={[{ required: true, message: "Please select meeting type" }]}
      >
        <Select placeholder="Select meeting type">
          <Option value="online">Online</Option>
          <Option value="offline">Offline</Option>
        </Select>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prev, curr) => prev.meetingType !== curr.meetingType}
      >
        {({ getFieldValue }) =>
          getFieldValue("meetingType") === "online" ? (
            <Form.Item
              name="meetingLink"
              label="Meeting Link"
              rules={[
                { required: true, message: "Please enter meeting link" },
                { type: "url", message: "Please enter a valid URL" },
              ]}
              tooltip="Enter a valid meeting URL (e.g., Zoom, Google Meet)"
            >
              <Input placeholder="Enter meeting link" />
            </Form.Item>
          ) : (
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter location" }]}
              tooltip="Enter the physical meeting location"
            >
              <Input placeholder="Enter meeting location" />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        name="notes"
        label="Notes"
        tooltip="Add any additional information about the session"
      >
        <TextArea
          rows={4}
          placeholder="Enter any additional notes"
          className="w-full"
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item className="flex justify-end gap-4 mt-8">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Create Schedule
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddSchedule;
